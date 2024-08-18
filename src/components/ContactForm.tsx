"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast"


const formSchema = z.object({
    name: z.string().min(3, { message: "Name is required and must be 3 characters long." }),
    email: z.string().email({ message: "Email is required and must be valid." }),
    message: z.string().min(10, { message: "Message is required and must be 10 characters long" }),
});

const ContactForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = await fetch(`/api/mail`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            const { success, message } = await data.json();
            if (success) {
                toast({ title: message });
                return form.reset();
            } else {
                toast({
                    title: message,
                    variant: 'destructive'
                });
            };
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message,
                variant: 'destructive'
            });
        };
    };

    return (
        <div className="w-full max-w-xl space-y-4">
            <div className="space-y-2">
                <h2 className="text-xl lg:text-2xl  font-bold text-center">
                    Connect with me
                </h2>
                <h4 className="text-gray-300 text-sm text-center">
                    Whether you have questions, feedback, or just want to say hello, I am here for you.
                </h4>
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="" >
                                        Enter name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            disabled={isSubmitting}
                                            className="outline-none"
                                            placeholder="e.g. 'John dow'"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="" >
                                        Enter email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isSubmitting}
                                            className="outline-none"
                                            placeholder="e.g. 'emaple@abc.com'"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="" >
                                            Message
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={isSubmitting}
                                                className="outline-none"
                                                placeholder="e.g. 'Anything you want to say to me. I will reply you soon.'"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button
                        className="w-full transition-all active:scale-95"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Send message
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ContactForm;