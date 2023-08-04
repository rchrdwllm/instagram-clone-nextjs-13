import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <SignIn />
        </div>
    );
};

export default SignInPage;
