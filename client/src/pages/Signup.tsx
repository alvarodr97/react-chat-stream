import { FormEvent, useRef } from "react";
import { Button } from "../components/Buttons";
import { Input } from "../components/Input";
import { useAuth } from "../context/AuthContext";

export function Signup() {
    const { signup } = useAuth();
    const userNameRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (signup.isLoading) return;

        const username = userNameRef.current?.value;
        const name = nameRef.current?.value;
        const imageUrl = imageUrlRef.current?.value;

        if (username == null || username === "" || name == null || name === "" ) return;

        signup.mutate({id: username, name, image: imageUrl})
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-end">
                <label htmlFor="userName">Username</label>
                <Input id="userName" pattern="\S*" required ref={userNameRef} />

                <label htmlFor="name">Name</label>
                <Input id="name" required ref={nameRef} />

                <label htmlFor="imageUrl">Image URL</label>
                <Input id="imageUrl" type="url" ref={imageUrlRef} />

                <Button disabled={signup.isLoading} type="submit" className="col-span-full">
                    {signup.isLoading ? "Loading..." : "Sign Up"}
                </Button>
            </form>
        </>
    )
}