import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { api } from "./_generated/api"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"
import stripe from "../src/lib/stripe"

const http = httpRouter()

const clerkWebHook  = httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if(!webhookSecret){
        throw new Error("Missing CLERK_WEBHOOK_SECRET environmental variable")
    }
    const svix_id = request.headers.get("svix-id")
    const svix_signature = request.headers.get("svix-signature")
    const svix_timestamp = request.headers.get("svix-timestamp")

    if(!svix_id || !svix_signature || !svix_timestamp){
       return new Response("Missing svix header", {
            status: 400
        })
    }
    const payload = await request.json()
    const body = JSON.stringify(payload)
    const wh = new Webhook(webhookSecret)
    let evt:WebhookEvent

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-signature": svix_signature,
            "svix-timestamp": svix_timestamp
        }) as WebhookEvent
    } catch (error) {
        console.error("Error verifying webhook", error)
        return new Response("Error ocuured", {status: 400})
    }

   const eventType  = evt.type
   if(eventType === "user.created"){
    const {id, email_addresses, first_name, last_name}  = evt.data

    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ""}|${last_name}`.trim();

    try {
        //TODO -> CREATE STRIPE CUSTOMER AS WELL 
        const customer = await stripe.customers.create({
            email,
            name,
            metadata: { clerkId: id }
        })
        await ctx.runMutation(api.users.createUser, {
            email, 
            name, 
            clerkId: id,
            stripeCustomerId: customer.id,
        })

        //SEND A WELCOME EMAIL
    } catch (error) {
        console.error("Error creating user in convex", error)
        return new Response("Error creating user", {status: 500})
    }

   }
   return new Response("webhook processed successfully", { status: 200 })

})

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: clerkWebHook
})

export default http
