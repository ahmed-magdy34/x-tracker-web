export const register = async (newUser) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    // Ensure JSON parsing only if response exists(chat gpt)
    const result = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      throw new Error(result?.error || `HTTP error: ${response.status}`);
    }

    return result;
  } catch (err) {
    console.error("Register Error:", err.message);
    return { error: err.message };
  }
};

export const login = async (loginData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    // Ensure JSON parsing only if response exists(chat gpt)
    const result = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      throw new Error(result?.error || `HTTP error: ${response.status}`);
    }

    // if (result?.token) {
    //   localStorage.setItem("authToken", result.token);
    // }

    return result;
  } catch (err) {
    console.error("Login Error:", err.message);
    return { error: err.message };
  }
};
export const addExpense = async (newExpense, token) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newExpense),
    });
    const result = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;
    if (!response.ok) {
      throw new Error(result?.error || `HTTP error: ${response.status}`);
    }
    return result;
  } catch (err) {
    console.error("Add Error:", err.message);
    return { error: err.message };
  }
};

export const getExpenses = async (token) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;
    if (!response.ok) {
      throw new Error(result?.error || `HTTP error: ${response.status}`);
    }
    return result;
  } catch (err) {
    console.error("get Error:", err.message);
    return { error: err.message };
  }
};
export const deleteExpenseApi = async (id, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;
    if (!response.ok) {
      throw new Error(result?.error || `HTTP error: ${response.status}`);
    }
    return result;
  } catch (err) {
    console.error("delete Error:", err.message);
    return { error: err.message };
  }
};
export const editExpenseApi = async (id, editedExpense, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedExpense),
    });
    const result = response.headers
      .get("content-type")
      ?.includes("application/json")
      ? await response.json()
      : null;
    if (!response.ok) {
      throw new Error(result?.error || `HTTP error: ${response.status}`);
    }
    return result;
  } catch (err) {
    console.error("edit Error:", err.message);
    return { error: err.message };
  }
};
