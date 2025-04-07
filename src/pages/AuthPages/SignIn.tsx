import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Login | Virtual HR Assistant"
        description="Sign in to your account on Virtual HR Assistant"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
