import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/axios";

export default function UsersSelect({ getSelectedUsers }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async function () {
      try {
        const response = await api.get("/api/users/fetch-users");
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const options = data.users.map((user) => ({
    value: user._id,
    label: user.email,
  }));

  return (
    <Select
      options={options}
      isMulti
      onChange={(selectedOptions) => {
        const selectedEmails = selectedOptions.map((option) => option.value);
        getSelectedUsers(selectedEmails);
      }}
      placeholder="Select users by email"
    />
  );
}
