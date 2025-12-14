import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/common/date-picker";
import { userApi } from "@/api/user";
import { AxiosError } from "axios";
import { Heart, User, Mail, Phone, Calendar } from "lucide-react";

// Profile update schema
const profileUpdateSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, "Please enter a valid phone number"),
  dob: z
    .date()
    .refine(
      (date) => {
        if (!date) return false;
        const today = new Date();
        return date <= today;
      },
      {
        message: "Date of birth cannot be in the future",
      }
    ),
});

type ProfileFormData = z.infer<typeof profileUpdateSchema>;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    username: string;
    email: string;
    phone: string;
    dob: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileUpdateSchema),
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const user = await userApi.getProfile();
        setUserProfile({
          username: user.username,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
        });
        
        // Set form default values
        reset({
          email: user.email,
          phone: user.phone,
          dob: user.dob ? new Date(user.dob) : undefined,
        });
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError.response?.status === 401) {
          // Unauthorized - redirect to login
          navigate("/login");
        } else {
          setApiError(axiosError.response?.data?.message || "Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      // Ensure all required fields are present
      if (!data.dob) {
        setApiError("Date of birth is required");
        return;
      }

      const updateData = {
        email: data.email,
        phone: data.phone,
        dob: data.dob.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };

      const user = await userApi.updateProfile(updateData);

      // Update local state with new data
      setUserProfile({
        username: user.username,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
      });
      
      // Update form with new values
      reset({
        email: user.email,
        phone: user.phone,
        dob: user.dob ? new Date(user.dob) : undefined,
      });

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;

      if (axiosError.response?.data) {
        const errorData = axiosError.response.data;

        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setApiError(errorMessages.join(", ") || "Validation error");
        } else {
          setApiError(errorData.message || "Failed to update profile");
        }
      } else {
        setApiError("Network error. Please check your connection and try again.");
      }
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      reset({
        email: userProfile.email,
        phone: userProfile.phone,
        dob: userProfile.dob ? new Date(userProfile.dob) : undefined,
      });
    }
    setIsEditing(false);
    setApiError(null);
    setSuccessMessage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          User Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>View and edit your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            {!isEditing ? (
              <div className="space-y-4">
                {/* Username - Read Only */}
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Username
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {userProfile.username}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Username cannot be changed
                  </p>
                </div>

                {/* Email - Read Only Display */}
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {userProfile.email}
                    </p>
                  </div>
                </div>

                {/* Phone - Read Only Display */}
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {userProfile.phone}
                    </p>
                  </div>
                </div>

                {/* Date of Birth - Read Only Display */}
                <div>
                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date of Birth
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-base text-gray-900 dark:text-gray-100">
                      {userProfile.dob
                        ? new Date(userProfile.dob).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4"
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username - Read Only */}
                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      value={userProfile.username}
                      disabled
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Username cannot be changed
                  </p>
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    {...register("email")}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register("phone")}
                    className="h-11"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div>
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
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                      {errors.dob.message}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {apiError && (
                  <div className="p-3 text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    {apiError}
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div className="p-3 text-sm text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    {successMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Favorite Movies Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Favorite Movies
            </CardTitle>
            <CardDescription>View and manage your favorite movies list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Heart className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your favorite movies will appear here
              </p>
              <Button
                onClick={() => navigate("/favorites")}
                variant="outline"
                className="w-full"
              >
                View Favorite Movies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
