import { useAppSelector } from "@/hooks/reduxHook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { HabitValue } from "@/Types/type";

const AnimatedComponent = ({ children }: { children: React.ReactNode }) => (
  <div className="animate-in fade-in duration-500">{children}</div>
);

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useAppSelector((state) => state.habits);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    let total = 0;
    if (data) {
      data.forEach((habit: HabitValue) => {
        total += habit.value.length;
      });
    }
    setTotalEntries(total);
  }, []);

  if (!user || !user.profile) {
    return (
      <AnimatedComponent>
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No user profile available</p>
          </CardContent>
        </Card>
      </AnimatedComponent>
    );
  }

  return (
    <AnimatedComponent>
      <Card className="w-full max-w-2xl mx-auto px-10 py-8">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            {user.username && (
              <AvatarImage src={user.profile} alt={user.username} />
            )}
            <AvatarFallback>
              <User className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {user.username}
            </CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">User ID:</span>
            <Badge variant="secondary">{user.uid}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1 flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-primary" />
              <p className="text-2xl font-bold">{data?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Habits</p>
            </div>
            <div className="space-y-1 flex flex-col items-center">
              <BookOpen className="w-6 h-6 text-primary" />
              <p className="text-2xl font-bold">{totalEntries || 0}</p>
              <p className="text-xs text-muted-foreground">Total Entries</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedComponent>
  );
}
