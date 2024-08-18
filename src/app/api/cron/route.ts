import supabase from "@/lib/supabase";

export const GET = async () => {
    try {
        const { error } = await supabase
            .from('rooms')
            .delete()
            .lte('created_at', new Date(Date.now() - 1000 * 60 * 60).toISOString());
        if (error) {
            return Response.json({
                success: false,
                message: error.message,
            }, { status: 400 });
        };
        return Response.json({
            success: true,
            message: "Cron job executed successfully.",
        }, { status: 200 });
    } catch (error: any) {
        return Response.json({
            success: false,
            message: "Error while calling the cron api.",
            error: error.message,
        }, { status: 500 });
    }
};