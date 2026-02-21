import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Signup() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const passwordsMatch =
        formData.confirmPassword === "" ||
        formData.password === formData.confirmPassword;

    const passwordStrength = (() => {
        const p = formData.password;
        if (p.length === 0) return { label: "", width: "0%", color: "" };
        if (p.length < 6)
            return { label: "Weak", width: "25%", color: "bg-red-500" };
        if (p.length < 8)
            return { label: "Fair", width: "50%", color: "bg-amber-500" };
        if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p))
            return { label: "Strong", width: "100%", color: "bg-emerald-500" };
        return { label: "Good", width: "75%", color: "bg-blue-500" };
    })();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordsMatch) return;
        setIsLoading(true);
        // TODO: Implement signup logic
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 w-full max-w-md px-4 py-8">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/25 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 text-white"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Create your account
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Get started with your free account today
                    </p>
                </div>

                <Card className="border-slate-800/50 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-black/20">
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-white text-lg">Sign Up</CardTitle>
                            <CardDescription className="text-slate-400">
                                Fill in your details to get started
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-slate-300">
                                    Full Name
                                </Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange("fullName")}
                                    required
                                    className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 h-11"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="signup-email" className="text-slate-300">
                                    Email
                                </Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange("email")}
                                    required
                                    className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 h-11"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="signup-password" className="text-slate-300">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange("password")}
                                        required
                                        className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 h-11 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {/* Password strength bar */}
                                {formData.password && (
                                    <div className="space-y-1">
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                                style={{ width: passwordStrength.width }}
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            Password strength:{" "}
                                            <span
                                                className={
                                                    passwordStrength.color === "bg-red-500"
                                                        ? "text-red-400"
                                                        : passwordStrength.color === "bg-amber-500"
                                                            ? "text-amber-400"
                                                            : passwordStrength.color === "bg-blue-500"
                                                                ? "text-blue-400"
                                                                : "text-emerald-400"
                                                }
                                            >
                                                {passwordStrength.label}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-slate-300"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    required
                                    className={`bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 h-11 ${!passwordsMatch
                                            ? "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                                            : ""
                                        }`}
                                />
                                {!passwordsMatch && (
                                    <p className="text-xs text-red-400">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-start gap-3 pt-1">
                                <input
                                    id="agree-terms"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0 cursor-pointer accent-blue-600"
                                />
                                <label
                                    htmlFor="agree-terms"
                                    className="text-xs text-slate-400 leading-relaxed cursor-pointer"
                                >
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                                    >
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading || !agreed || !passwordsMatch}
                                className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-40 cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Creating account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700/50" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-slate-900 px-3 text-slate-500">
                                        or sign up with
                                    </span>
                                </div>
                            </div>

                            {/* Social Signup */}
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all cursor-pointer"
                                >
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all cursor-pointer"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </Button>
                            </div>

                            <p className="text-center text-sm text-slate-400 w-full">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
