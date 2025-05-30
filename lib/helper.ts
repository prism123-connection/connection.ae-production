export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  referralCode: string
) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        referralCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Register failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const resendConfirmationMail = async (email: string) => {
  try {
    const response = await fetch("/api/auth/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`Resend confirmation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Resend confirmation error:", error);
    return { success: false, message: "Something went wrong!" }; 
  }
};

export async function verify(token: string) {
  try {
    // console.log("Sent token: ", token);
    const response = await fetch(`/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    // console.log("Response in verify: ", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Verification failed",
      };
    }

    return {
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        },
        token: data.token,
      },
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export const updateAccount = async (
  dateOfBirth: string,
  gender: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  emiratesId: string,
  phoneNumber: string,
  occupation: string,
  referralSource: string,
  joinReason: string
) => {
  try {
    const response = await fetch(`/api/user/setup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        dateOfBirth,
        gender,
        address,
        city,
        state,
        zipCode,
        emiratesId,
        phoneNumber,
        occupation,
        referralSource,
        joinReason,
      }),
    });

    const data = await response.json();
    // console.log("Response in setup: ", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update user data",
      };
    }

    return {
      success: true,
      message: "User data successfully updated",
    };
  } catch (error) {
    console.error("Error updating user data:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
export const updateOnboardRole = async (
imgLink : string, 
userFirstName : string, 
userLastName : string
) => {
  try {
    const response = await fetch(`/api/user/onboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ imgLink, userFirstName , userLastName }),
    });

    const data = await response.json();
    // console.log("Response in setup: ", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update user data",
      };
    }

    return {
      success: true,
      message: "User data successfully updated",
    };
  } catch (error) {
    console.error("Error updating user data:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export async function getUserProfile() {
  try {
    const response = await fetch("/api/user/profile", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    // console.log("Came here with: ", data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}`);
    return null;
  }
}

export const submitUserData = async (data: Record<string, any>) => {
  try {
    const response = await fetch("/api/user/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
