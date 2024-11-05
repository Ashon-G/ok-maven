import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SignupChoice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose your role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select how you want to join our platform
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link to="/signup/founder" className="w-full block">
            <Button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Join as a Founder
            </Button>
          </Link>
          <Link to="/signup/maven" className="w-full block">
            <Button
              className="w-full py-3 bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Join as a Maven
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupChoice;