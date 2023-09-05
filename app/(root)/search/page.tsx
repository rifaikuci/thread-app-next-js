import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import {fetchUser, fetchUserPosts, fetchUsers} from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {profileTabs} from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import React from "react";
import UserCard from "@/components/cards/UserCard";

export const revalidate = 0;

async function page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");


    const result = await fetchUsers({
        userId: user.id,
        searchString : '',
        pageNumber: 1,
        pageSize: 25
    })

    return (
        <section>
            <h1 className={"head-text mb-10"}>
            </h1>
            {/* Search bar */}

            <div className ={"mt-14 flex flex-col gap-9"} >
                {
                    result.users.length === 0 ? (
                        <p className={"no-result"}>  No Users</p>
                    ) : (
                        <>
                            {result.users.map((person : any) => (
                                <UserCard
                                    key = {person.id}
                                    id = {person.id}
                                    name = {person.name}
                                    username = {person.username}
                                    imgUrl = {person.image}
                                    personType = {"user"}

                                />

                            ))}
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default page;