"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RegisterFormData {
    email: string
    username: string
    password: string
}

function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const form = useForm<RegisterFormData>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: RegisterFormData) {
        setLoading(true)
        setError(null)
        setSuccessMessage(null)

        console.log("Submitting form with values:", values)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}Account/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            console.log("Response:", response)

            if (!response.ok) {
                throw new Error('Registration failed. Please try again.')
            }

            const data = await response.json()
            setSuccessMessage('Registration successful!')
            console.log('Registration successful:', data)
        } catch (error) {
            setError((error as Error).message)
            console.error('Error:', error)
        } finally {
            setLoading(false)
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="@gmail.com" {...field} />
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
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                    </form>
                </Form>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </>
    );
}

export default RegisterForm;
