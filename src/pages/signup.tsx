import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/common/date-picker";
import { Eye, EyeOff } from "lucide-react";
import { signupSchema, type SignupFormData } from "@/lib/validation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      dob: undefined,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    // Format data for API
    const submitData = {
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone,
      dob: data.dob ? data.dob.toISOString().split("T")[0] : "",
    };

    // TODO: Handle sign up logic
    console.log("Sign up attempt:", submitData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Create Account
          </h1>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="h-11"
            />
            {errors.username && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register("email")}
              className="h-11"
            />
            {errors.email && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="h-11 pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              className="h-11"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value}
                  onDateChange={(date) => field.onChange(date)}
                  placeholder="Select your date of birth"
                />
              )}
            />
            {errors.dob && (
              <p className="text-sm text-red-500 dark:text-red-400">
                {errors.dob.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
