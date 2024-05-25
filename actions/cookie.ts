"use server";

import { cookies } from "next/headers";
const cookie = cookies();
export const setCookies = async (key: string, value: string) => {
  cookie.set(key, value);
};
