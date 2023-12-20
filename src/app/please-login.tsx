'use client'

import { Terminal } from "lucide-react";
import Link from 'next/link';

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const PleaseLogin = () => {
    return (
      <div className="flex items-center justify-center w-[30rem] h-[45rem]">
        <Alert>
            <Terminal className="h-4 w-4" />
                <AlertTitle>驗證失敗</AlertTitle>
                <AlertDescription>
                你尚未登入，請先登入！
                </AlertDescription>
                <div className="flex items-center justify-end">
                <Button asChild variant='link'>
                    <Link href='/api/auth/signin'>
                        前往登入
                    </Link>
                </Button>
                </div>
        </Alert>
      </div>
  )
}

export default PleaseLogin;