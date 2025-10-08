import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { whatsappLink, SITE } from "@/lib/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Schema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .min(10, "Enter valid phone")
    .regex(/^\+?\d[\d\s-]{8,}$/i, "Enter valid phone"),
  email: z.string().email().optional().or(z.literal("")),
  service: z.enum(["Laundry", "Dry Cleaning", "Ironing", "Other"]),
  address: z.string().min(6, "Enter address"),
  message: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof Schema>;

export default function Contact() {
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "Laundry",
      address: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    const text = `New enquiry for ${values.service}%0AName: ${values.name}%0APhone: ${values.phone}%0AEmail: ${values.email || "-"}%0AAddress: ${values.address}%0AMessage: ${values.message || "-"}`;
    const url = whatsappLink(text);
    toast({ title: "Opening WhatsApp…", description: "Your details will be sent in chat." });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Contact</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto break-words">
            Fill the form to book a pickup or ask anything. You can also reach us directly on WhatsApp.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98xxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Laundry">Laundry (Wash & Fold)</SelectItem>
                                <SelectItem value="Dry Cleaning">Dry Cleaning</SelectItem>
                                <SelectItem value="Ironing">Ironing/Pressing</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="House/Flat, Street, Area, City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any specific instructions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="min-w-40 w-full sm:w-auto">Send via WhatsApp</Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">Open WhatsApp</a>
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Visit or call us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">Address</div>
                  <p className="text-muted-foreground">Prem Nagar,Goregaon West, Unnat Nagar no 2,Near inorbit mall Mumbai-400104.</p>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <span>{SITE.phoneDisplay}</span>
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <a className="text-primary hover:underline dark:text-emerald-400" href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer">Chat now</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
