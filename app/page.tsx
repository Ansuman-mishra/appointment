import { Calender } from "@/components/Calender";
import SummaryComp from "@/components/SummaryComp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    return (
        <main className="">
            <Tabs defaultValue="calender" className="m-5">
                <TabsList>
                    <TabsTrigger value="calender">Calender</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value="calender">
                    <Calender />
                </TabsContent>
                <TabsContent value="summary">
                    <SummaryComp />
                </TabsContent>
            </Tabs>
        </main>
    );
}
