import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import { signin, signup, verifySignup } from "../app/actions/auth";
import { useStateContext } from "../contexts/ContextProvider";

const Auth = () => {
  const { authData, setAuthData, setAuthToken } = useStateContext();

  const [isSignup, setIsSignup] = useState(false);
  const [isVerification, setIsVerification] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const fromLocation = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const userData = await dispatch(signup(authData));

      if (userData) {
        // account activation email is sent
        // switch to the verification form
        setIsVerification(true);
      }
    } else {
      // login
      const data = await dispatch(signin(authData, navigate, fromLocation));

      if (data?.result) {
        const user = JSON.parse(localStorage?.getItem("profile"));
        setAuthToken(user?.token);
        navigate("/", { replace: true });

        if (!data?.result?.emailVerified) {
          // prompt text box for entering activation code
          setIsVerification(true);
        }
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // submit the verification code
    dispatch(verifySignup(authData, navigate));
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setIsVerification(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful.");
  };
  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className="container py-6 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        We are The eHay Team
                      </h4>
                    </div>
                    <p className="mb-4"> {isSignup ? "Sign up" : "Sign In"} </p>
                    <form onSubmit={handleSubmit}>
                      {isSignup && !isVerification && (
                        <>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="firstName"
                              name="firstName"
                              placeholder="First Name"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="lastName"
                              name="lastName"
                              placeholder="Last Name"
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      )}
                      {isVerification && (
                        <>
                          <div class="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="verificationCode"
                              name="verificationCode"
                              placeholder="Verification Code(6 digits)"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="text-center pt-1 mb-12 pb-1">
                            <button
                              onClick={handleVerify}
                              className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="button"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              Verify...
                            </button>
                          </div>

                          <h5>
                            We just sent your activation code via email. Open
                            your email and enter the code above and click on
                            Verify... button to be granted access to the system.
                          </h5>
                          <br />
                        </>
                      )}
                      {!isVerification && (
                        <>
                          <div className="mb-4">
                            <input
                              type="email"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="email"
                              name="email"
                              placeholder="Email Address"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="password"
                              name="password"
                              placeholder="Password"
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      )}
                      {isSignup && !isVerification && (
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat Password"
                            onChange={handleChange}
                          />
                        </div>
                      )}

                      {!isVerification && (
                        <>
                          <div className="text-center pt-1 mb-4 pb-1">
                            <button
                              className="inline-block px-6 py-2.5 text-white bg-blue-400 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="submit"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              {isSignup ? "Sign Up" : "Sign In"}
                            </button>

                            <GoogleLogin
                              clientId={process.env.REACT_APP_CLIENT_ID}
                              render={(renderProps) => (
                                <div>
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                  >
                                    {/* <Icon /> */}
                                    Google Sign In
                                  </button>
                                </div>
                              )}
                              onSuccess={googleSuccess}
                              onFailure={googleFailure}
                              cookiePolicy="single_host_origin"
                            />
                          </div>
                        </>
                      )}

                      <div className="flex items-center justify-between pb-6">
                        <button
                          type="button"
                          onClick={switchMode}
                          className="inline-block px-6 py-2.5 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        >
                          {isSignup
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign up"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                  <div className="text-black px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-xl font-semibold mb-6">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
