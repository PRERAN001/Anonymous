"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function PublicProfile() {
  const [message, setMessage] = useState("");
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [isfetching, setisfetching] = useState(false);

  const [suggestedMessages, setsuggestedmessage] = useState([]);

  const sendmessage = async () => {
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: message,
      });
      if (response.data.success) {
        toast("MEssage sent");
        return Response.json({
          success: true,
          message: "message sent",
        });
      } else {
        toast("user is  not accepting the messages");
        return Response.json({
          success: false,
          message: "user is not accepting the messages",
        });
      }
    } catch (error) {
      console.log("error", error);
      return Response.json({
        success: false,
        message: error,
      });
    }
  };

  const getsuggestions = async () => {
    try {
      setisfetching(true);

      const response = await axios.post("/api/suggest-msgs");

      if (response.data.success) {
        console.log(response.data, response);
        console.log(response.data.response.content.split("||"));
        const raw = response.data.response.content;

        const cleaned = raw
          .replace(/^"|"$/g, "") // remove starting & ending quotes
          .split("||")
          .map((msg: string) => msg.trim()); // remove extra spaces

        setsuggestedmessage(cleaned);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisfetching(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white text-black px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-center mb-12">
          Public Profile Link
        </h1>

        {/* Send Message Section */}
        <Card className="border border-black/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Send Anonymous Message to{" "}
              <span className="font-semibold">@hc</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <Textarea
              placeholder="Type your anonymous message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none border-black/20 focus-visible:ring-black"
            />

            <div className="flex justify-center">
              <Button
                onClick={sendmessage}
                className="bg-black text-white hover:bg-black/80 px-8"
              >
                Send It
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggest Messages */}
        <div className="mt-12">
          <Button
  variant="outline"
  className="border-black/20 hover:bg-black hover:text-white"
  onClick={getsuggestions}
  disabled={isfetching}
>
  {isfetching ? "Loading..." : "Suggest Messages"}
</Button>

          <p className="text-black/60 mt-6 mb-4">
            Click on any message below to select it.
          </p>

          <Separator className="mb-6 bg-black/10" />

          <Card className="border border-black/10 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Messages</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {suggestedMessages.map((msg, index) => (
                <div
                  key={index}
                  onClick={() => setMessage(msg)}
                  className="border border-black/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
                >
                  {msg}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
