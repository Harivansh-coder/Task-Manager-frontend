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
    id: "1",
    title: "Task 1",
    description: "Description 1",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 1,
  },

  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 2,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 3,
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description 4",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 4,
  },
  {
    id: "5",
    title: "Task 5",
    description: "Description 5",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 5,
  },
  {
    id: "6",
    title: "Task 6",
    description: "Description 6",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 6,
  },
  {
    id: "7",
    title: "Task 7",
    description: "Description 7",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 7,
  },
  {
    id: "8",
    title: "Task 8",
    description: "Description 8",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 8,
  },
  {
    id: "9",
    title: "Task 9",
    description: "Description 9",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 9,
  },
  {
    id: "10",
    title: "Task 10",
    description: "Description 10",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",

    priority: 10,
  },
  {
    id: "11",
    title: "Task 11",
    description: "Description 11",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 11,
  },
  {
    id: "12",
    title: "Task 12",
    description: "Description 12",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 12,
  },
  {
    id: "13",
    title: "Task 13",
    description: "Description 13",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 13,
  },
  {
    id: "14",
    title: "Task 14",
    description: "Description 14",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 14,
  },
  {
    id: "15",
    title: "Task 15",
    description: "Description 15",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 15,
  },
  {
    id: "16",
    title: "Task 16",
    description: "Description 16",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 16,
  },
  {
    id: "17",
    title: "Task 17",
    description: "Description 17",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 17,
  },
  {
    id: "18",
    title: "Task 18",
    description: "Description 18",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 18,
  },
  {
    id: "19",
    title: "Task 19",
    description: "Description 19",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "pending",
    priority: 19,
  },
  {
    id: "20",
    title: "Task 20",
    description: "Description 20",
    startTime: new Date().toISOString(),
    dueTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    status: "finished",
    priority: 20,
  },
];

export type Task = {
  id: string;
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
    alert("You need to login first");
    throw new Error("You need to login first");
  }

  const query = new URLSearchParams(queries).toString();

  // const response = await fetch(`${apiURL}/tasks?${query}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Something went wrong");
  // }

  // const data = await response.json();

  console.log("query", query);

  return [];
}
