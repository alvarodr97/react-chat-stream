import { FormEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Buttons";
import { Input } from "../components/Input";
import { useAuth } from "../context/AuthContext";

export function Login() {
    const { login, user } = useAuth();
    const userNameRef = useRef<HTMLInputElement>(null);

    if ( user != null ) return <Navigate to="/" />

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (login.isLoading) return;

        const username = userNameRef.current?.value;

        if (username == null || username === "") return;

        login.mutate(username)
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-end">
                <label htmlFor="userName">Username</label>
                <Input id="userName" pattern="\S*" required ref={userNameRef} />

                <Button disabled={login.isLoading} type="submit" className="col-span-full">
                    {login.isLoading ? "Loading..." : "Log In"}
                </Button>
            </form>
        </>
    )
}