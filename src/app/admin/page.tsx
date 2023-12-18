'use server';

import { Button } from "@/components/ui/button";
import Link from "next/link";

const adminPage = () => {
    return (
        <div className="flex flex-col justify-between">
            <div className="w-100 h-100 px-10 py-10">
                <Button asChild className="w-[30rem] h-[20rem] text-3xl">
                    <Link href="/admin/review" >
                        管理卡片
                    </Link>
                </Button>
            </div>
            <div className="px-10 py-10">
                <Button asChild className="w-[30rem] h-[20rem] text-3xl">
                    <Link href="/admin/users">
                        審核用戶
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default adminPage