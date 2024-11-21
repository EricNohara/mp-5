import getCollection, { URL_COLLECTION } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { alias, url }: { alias: string; url: string } = await req.json();

  const collection = await getCollection(URL_COLLECTION);

  const result = await collection.findOne({ alias });

  if (result) {
    return NextResponse.json(
      { message: "Alias already exists" },
      { status: 403 }
    );
  }

  const urlAlias = { alias: alias, url: url };

  const response = await collection.insertOne(urlAlias);

  if (!response.acknowledged) {
    return NextResponse.json(
      { message: "Error adding alias" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Successfully saved alias" },
    { status: 200 }
  );
}
