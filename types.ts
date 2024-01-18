// types.ts

export type TicketType = {
    _id: string;
    title: string;
    email: string;
    description: string;
    status: string;
  };
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  UserDashboard: undefined;
  AdminDashboard: undefined;
  DashboardTabs: undefined;
  AdminDashboardTabs: undefined;
  TicketRequest: undefined;
  TicketStatus: undefined;
  UserProfile: undefined;
  TicketDetailScreen: { ticket: TicketType };
  // Add other screens as needed
};
