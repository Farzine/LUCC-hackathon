import IsAuthenticatedUser from "../../middleware/IsAuthenticatedUser";

export default function Page() {
  return (
    <IsAuthenticatedUser>
      <div>PROFILE</div>
    </IsAuthenticatedUser>
  );
}
