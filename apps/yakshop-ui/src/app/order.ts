"use server";

export async function order(day: number, formData: FormData) {
  try {
    const rawFormData = {
      customer: formData.get("name"),
      order: {
        milk: Number(formData.get("milk")) ?? 0,
        skins: Number(formData.get("skins")) ?? 0,
      },
    };
    const res = await fetch(`http://localhost:3001/yak-shop/order/${day}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });
    let message = "";
    switch (res.status) {
      case 201:
        message = "Fully Successful! Yak gods looks upon you!";
        break;
      case 206:
        message = "Partial successful. Cool kid!";
        break;
      case 404:
        message = "Not enough stock! Try tomorrow";
        return { message, result: { milk: 0, skins: 0 }, status: res.status };
      default:
        message = "Something went awfully wrong";
        return { message, result: { milk: 0, skins: 0 }, status: res.status };
    }
    const result = await res.json();
    return { message, result, status: res.status };
  } catch (error) {
    console.error(error);
  }
}
