type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
};

export default async function Now(props: Props) {
  const { id } = await props.params;
  console.log(id);

  return <div>NOW!</div>;
}
