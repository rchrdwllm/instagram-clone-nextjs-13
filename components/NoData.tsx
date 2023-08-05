import Link from 'next/link';

const NoData = () => {
    return (
        <div className="h-screen w-full flex flex-col space-y-4 items-center justify-center">
            <h1 className="text-3xl text-slate-600 font-bold">
                Seems like there's nothing here yet!
            </h1>
            <p className="text-slate-600">
                Try adding a new post{' '}
                <Link
                    href="/create"
                    className="underline underline-offset-2 transition-colors hover:text-slate-50"
                >
                    here!
                </Link>
            </p>
        </div>
    );
};

export default NoData;
