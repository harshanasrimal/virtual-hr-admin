import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { loginAdmin } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export default function SignInForm() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    setError('');
    e.preventDefault();
    try {
      const { access_token, user } = await loginAdmin(email, password);
      if(user?.role !== 'HR') {
        setError('You are not authorized to access this application.');
        setIsLoading(false);
        return;
      }
      login(access_token, user);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message?.message || 'Login failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex justify-center mb-5 sm:mb-5">
          <img
            className="dark:hidden"
            src="/images/logo/logo.png"
            alt="Logo"
            width={300}
            height={80}
          />
          </div>
          <div className="flex justify-center mb-5 sm:mb-8">
                      <p className="text-md text-gray-500 dark:text-gray-400">
              Empowering HR Teams with AI-driven Automation
            </p>
        </div>
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleLogin} >
              <div className="space-y-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                   placeholder="info@virtualhr.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={isLoading}>
                    {isLoading && (
                      <svg
                        className="w-4 h-4 mr-3 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a10 10 0 1 0 0 20A10 10 0 1 0 12 2Zm0 18a8 8 0 1 1 0-16a8 8 0 1 1 0 16Z"
                        />
                      </svg>
                    )}
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
