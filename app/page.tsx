import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { getClerkUser } from '@/lib/auth';

const Page = async () => {
    const user = await getClerkUser();

    if (user) return redirect('/feed');

    return (
        <div className="h-screen flex flex-col space-y-4 justify-center items-center">
            <h1 className="text-5xl font-bold">Instagram Clone</h1>
            <p className="text-slate-400 text-center w-1/2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At accusantium aperiam
                placeat voluptates esse ipsam quaerat impedit in, fugiat laborum.
            </p>
            <div className="flex space-x-4">
                <Link href="/sign-in">
                    <Button>Sign in</Button>
                </Link>
                <Link href="/sign-up">
                    <Button variant="secondary">Sign up</Button>
                </Link>
            </div>
        </div>
    );
};

export default Page;
