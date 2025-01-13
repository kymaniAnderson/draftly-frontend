/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import axios from "@/app/api/axios";

export const GET = async (
  req: NextApiRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params;
    const response = await axios.get(`/api/templates/${id}`, {
      headers: {
        Authorization: null,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.message ?? "There was a problem loading data",
      },
      { status: error?.response?.status ?? 500 }
    );
  }
};
