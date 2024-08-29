"use client"
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
    confirmPassword: string
}

function RegisterForm() {

    const form = useForm<RegisterFormData>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    })
    
    function onSubmit(values: RegisterFormData) {
        console.log(values)
    }

    return (
        <>
        <h1 className="text-4xl text-center mt-8">Đăng ký tài khoản</h1>
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
                                    <Input type='password' placeholder="**********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="bg-sky-600" type="submit">Đăng ký</Button>
                </form>
            </Form>
        </div>
        </>
    );
}

export default RegisterForm;
