import Anthropic from "@anthropic-ai/sdk";

import { NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

export async function POST(request: Request) {
  const { items, filters } = await request.json();

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: "generate a simple random recipe with steps."
      }
    ]
  });

  console.log("////////// ", message.content);

  const block = message.content.find((block) => block.type === "text");

  return NextResponse.json({
    recipe: block?.text ?? ""
  });
}
