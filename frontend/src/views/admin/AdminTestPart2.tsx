export default function AdminTestPart2() {
  return (
    <>
      <button
        data-command="printSection"
        data-command-args="'mySection'"
        data-command-event="click"
      >
        {' 🖨️ پرینت بخش مورد نظر '}
      </button>
    </>
  );
}
