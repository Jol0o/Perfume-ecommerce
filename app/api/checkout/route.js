import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY, {
    apiVersion: "2022-11-15",
});

export async function POST(request) {
    try {
        const body = await request.json();

        if (Array.isArray(body) && body.length > 0) {
            const lineItems = body.map((item) => ({
                price_data: {
                    currency: "php",
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: [item.image[0]], // Wrap the URL in an array
                    },
                    unit_amount: item.price * 100, // Multiply by 100 to convert to the smallest currency unit (e.g., cents)
                },
                quantity: item.quantity,
            }));

            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: lineItems,
                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
            });

            return NextResponse.json({ session });
        } else {
            return NextResponse.json({ message: "No Data Found" });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message });
    }
}
