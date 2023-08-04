import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <SignUp />
        </div>
    );
};

export default SignUpPage;
