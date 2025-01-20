const API_URL = import.meta.env.VITE_API_URL;

export type Task = {
  _id: string;
  title: string;
  description: string;
  startTime?: string;
  dueTime: string;
  userId: number;
  priority: number;
};
export async function getAllTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();

    return data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function createTask(task: Partial<Task>) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function updateTask(task: Partial<Task>, id: string) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getTask(id: string) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data.data;
  } catch (e) {
    console.log(e);
  }
}

type LoginResponse = {
  status: boolean;
  data: {
    accessToken: string;
  } | null;
  message: string;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        data: null,
        message: data.error,
      };
    }

    return {
      status: true,
      data: data.data,
      message: "Login successful",
    };
  } catch (e) {
    console.error(e);

    return {
      status: false,
      data: null,
      message: "Something went wrong",
    };
  }
};

export const signUpUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: false,
        data: null,
        message: data.error,
      };
    }

    return {
      status: true,
      data: data.data,
      message: "signup successful",
    };
  } catch (e) {
    console.error(e);

    return {
      status: false,
      data: null,
      message: "Something went wrong",
    };
  }
};
