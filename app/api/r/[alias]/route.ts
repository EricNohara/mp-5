import getCollection, { URL_COLLECTION } from "@/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { alias: string } }
) {
  const { alias } = params;

  if (!alias) {
    return NextResponse.json(
      { message: "Alias not provided" },
      { status: 400 }
    );
  }

  const collection = await getCollection(URL_COLLECTION);

  const result = await collection.findOne({ alias });

  if (!result) {
    return NextResponse.json({ message: "Alias not found" }, { status: 404 });
  }

  redirect(result.url);
}
