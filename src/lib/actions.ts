import supabase from "@/lib/supabase";

export const brodcastRealtimeEvent = async (roomId: string, event: string, payload: any) => {
    try {
        const channel = supabase.channel(roomId);
        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.send({
                    type: "broadcast",
                    event,
                    payload,
                });
            };
        });
    } catch (error) {
        throw error;
    }
};

export const createRoom = async () => {
    try {
        const { data, error } = await supabase
            .from("rooms")
            .insert({})
            .select();
        if (error) throw new Error(error.message);
        return data[0].id;
    } catch (error) {
        throw error;
    }
};

export const deleteRoom = async (roomId: string) => {
    try {
        const { error } = await supabase
            .from("rooms")
            .delete()
            .eq("id", roomId);
        if (error) throw new Error(error.message);
    } catch (error) {
        throw error;
    }
};

export const findRandomRoom = async () => {
    try {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
        const { data, error } = await supabase
            .from("rooms")
            .select("id")
            .gte("created_at", oneMinuteAgo);
        if (error) throw new Error(error.message);
        if (data.length === 0) return null;
        const randomRoom = data[Math.floor(Math.random() * data.length)];
        return randomRoom.id;
    } catch (error) {
        throw error;
    }
};