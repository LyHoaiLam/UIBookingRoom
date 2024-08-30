"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LoginFormData {
    username: string;
    password: string;
}

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<LoginFormData>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormData) {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch("http://localhost:5102/api/Account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer your_token_here",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please try again.");
            }

            const data = await response.json();
            setSuccessMessage("Login successful!");
            localStorage.setItem("token", data.token);
            router.push("/viewbooking");

        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-[600px]">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên đăng nhập</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="**********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="bg-sky-600" type="submit" disabled={loading}>
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </form>
                </Form>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </>
    );
}

export default LoginForm;
