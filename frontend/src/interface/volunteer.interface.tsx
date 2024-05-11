export type TVolunteer = 'individual' | 'organisation';
export type VolunteerActivityType = {
  volunteerHours: number;
  volunteerRequests: [];
  volunteerSessions: [];
  programmeEvents: [];
};

export interface IYourDetailsForm {
  volunteerType: TVolunteer;
  eventType: string[];
  title: string;
  fullname: string;
  surname: string;
  orgName: string;
  designation: string;
  gender: string;
  birthdate: string;
  email: string;
  phone: string;
  postalcode: string;
  address: string;
  knowAboutUs: string;
  remarks: string;
  receiveMonthlyNewsletter: boolean; // receive update
  agreeVolunteerCoC: boolean; // codeOfConduct
  agreeVolunteerTC: boolean; // terms condition
  isBreadRun: boolean;
  isFoodPacking: boolean;
  query?: string;
}

export interface IVolunteerYourDetailResponse {
  message: string;
  volunteer: {
    id: string;
  };
}
