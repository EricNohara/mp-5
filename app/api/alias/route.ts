import getCollection, { URL_COLLECTION } from "@/db";
import { NextResponse } from "next/server";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const collection = await getCollection(URL_COLLECTION);
    const results = await collection.find().toArray();
    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching documents" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { alias, url }: { alias: string; url: string } = await req.json();

    if (!isValidUrl(url)) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

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
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error adding alias" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { alias, url, aliasNew, urlNew } = await req.json();

    if (!alias || !url || !aliasNew || !urlNew) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidUrl(urlNew)) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const filter = { alias: alias, url: url };
    const update = { $set: { alias: aliasNew, url: urlNew } };

    const collection = await getCollection(URL_COLLECTION);

    const result = await collection.updateOne(filter, update);

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Alias not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Alias updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating alias" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { alias, url } = await req.json();

    const collection = await getCollection(URL_COLLECTION);

    const filter = { alias: alias, url: url };

    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Alias not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully deleted alias" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error deleting alias" },
      { status: 500 }
    );
  }
}
