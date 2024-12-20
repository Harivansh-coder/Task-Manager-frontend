import { authStore } from "@/lib/stores/authStore";

const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type signupReturn = {
  status: "success" | "error";
  message: string;
  data: unknown;
};

export async function signUp(data: unknown): Promise<signupReturn> {
  try {
    const response = await fetch(`${apiURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!response.ok) {
      return {
        status: "error",
        message: resData.message,
        data: null,
      };
    }

    return {
      status: "success",
      message: "User created successfully",
      data: resData,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Something went wrong",
      data: null,
    };
  }
}

export async function signIn(data: unknown): Promise<signupReturn> {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (!response.ok) {
      return {
        status: "error",
        message: resData.message,
        data: null,
      };
    }

    return {
      status: "success",
      message: "User logged in successfully",
      data: resData,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Somethign went wrong",
      data: null,
    };
  }
}
const tempData: Task[] = [
  {
    _id: "1",
    title: "Task 1",
    description: "Description 1",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 1,
  },

  {
    _id: "2",
    title: "Task 2",
    description: "Description 2",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 2,
  },
  {
    _id: "3",
    title: "Task 3",
    description: "Description 3",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 3,
  },
  {
    _id: "4",
    title: "Task 4",
    description: "Description 4",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 4,
  },
  {
    _id: "5",
    title: "Task 5",
    description: "Description 5",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 5,
  },
];

export type Task = {
  _id: string;
  title: string;
  description?: string;
  startTime: string;
  dueTime: string;
  endTime?: string;
  status: string;
  priority: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getTask(queries: any): Promise<Task[]> {
  const token = authStore.getState().token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams(queries).toString();

  try {
    const response = await fetch(`${apiURL}/tasks?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
    // Uncomment the following line to return a mock response
    // throw new Error("Something went wrong");
    return tempData;
  }
}

export type Analytics = {
  totalTasks: number;
  finishedTasks: number;
  pendingTasks: number;
  percentageTasksfinished: number;
  percentageTasksPending: number;
  averageCompletionTime: number;
  totalLapsedTime: number;
  totalEstimatedTime: number;
};

export async function getTaskById(id: string): Promise<Task> {
  const token = authStore.getState().token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${apiURL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
    // Uncomment the following line to return a mock response
    // throw new Error("Something went wrong");
    return tempData[0];
  }
}

// create a new task
export async function createTask(data: Partial<Task>): Promise<Task> {
  const token = authStore.getState().token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${apiURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    // Uncomment the following line to return a mock response
    // throw new Error("Something went wrong");
    return tempData[0];
  }
}

// update a task

export async function updateTask(
  id: string,
  data: Partial<Task>
): Promise<Task> {
  const token = authStore.getState().token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${apiURL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    // Uncomment the following line to return a mock response
    // throw new Error("Something went wrong");
    return tempData[0];
  }
}

// delete a task
export async function deleteTask(id: string): Promise<void> {
  const token = authStore.getState().token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    await fetch(`${apiURL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    // Uncomment the following line to return a mock response
    // throw new Error("Something went wrong");
  }
}

export async function getAnalytics(): Promise<Analytics> {
  const token = authStore.getState().token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${apiURL}/analytics/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    // Uncomment the following line to return a mock response
    // throw new Error("Something went wrong");
    return {
      totalTasks: 0,
      finishedTasks: 0,
      pendingTasks: 0,
      percentageTasksfinished: 0,
      percentageTasksPending: 0,
      averageCompletionTime: 0,
      totalLapsedTime: 0,
      totalEstimatedTime: 0,
    };
  }
}
