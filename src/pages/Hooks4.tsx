import Section from "../components/Section";
import UpdateNameForm from "../components/UpdateNameForm";

export default function Hooks4() {
  return (
    <>
      <Section
        heading="useDeferredValue()"
        description="useful when you have a Suspense-enabled data source (Relay or Next.js), to show the old query-result while the new query is being processed"
      >
        <a href="https://react.dev/reference/react/useDeferredValue#showing-stale-content-while-fresh-content-is-loading">
          see usage section example
        </a>
      </Section>
      <Section
        heading="useActionState()"
        description="for server actions or form submits"
      >
        <UpdateNameForm />
      </Section>
    </>
  );
}
