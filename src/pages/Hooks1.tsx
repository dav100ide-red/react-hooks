import { useCallback, useRef, useState } from "react";
import List from "../components/List";
import Child from "../components/Child";
import { Hooks1StateContext } from "../contexts/Hooks1StateContext";
import Section from "../components/Section";
import Modal, { ModalHandles } from "../components/Modal";

export default function Hooks1() {
  const [number, setNumber] = useState(1);
  const [isRed, setIsRed] = useState(false);
  const modalRef = useRef<ModalHandles>(null);
  //   const getNums = () => {
  //     return [number, number + 1, number + 2];
  //   };
  const getNums = useCallback(() => [number, number + 1, number + 2], [number]);

  const openModal = () => {
    modalRef.current?.open();
  };

  return (
    <Hooks1StateContext.Provider value={{ isRed }}>
      <Section heading="useCallback()">
        <div className="bg-gray-600 p-5">
          <input
            className={
              isRed ? "border-2 border-red-900" : "border-2 border-blue-500"
            }
            type="number"
            value={number}
            onChange={(e) => setNumber(+e.target.value)}
          />
          <button
            className={isRed ? "bg-red-900" : "bg-blue-500"}
            onClick={() => setIsRed((prev) => !prev)}
          >
            toggle isRed
          </button>
          <div className="bg-gray-200 m-2 p-4 rounded-lg">
            CHILD LIST:
            <List getItems={getNums} />
          </div>
        </div>
      </Section>
      <Section
        heading="useContext()"
        description="no props drilling, isRed is read through useContext()"
      >
        <div
          className={`not-prose text-white p-5 rounded-2xl ${
            isRed ? "bg-red-800" : "bg-blue-800"
          }`}
        >
          <h4 className="text-xl">PARENT component </h4>
          <Child />
        </div>
      </Section>
      <Section
        heading="useImperativeHandle() & forwardRef"
        description="si usano in combinazione, si crea un child-component con forwardRed<ExposedMethods, ChildProps>(), si definiscono nella child-component ciò che vuoi esporre al parent tramite `useImperativeRef`, poi usa useRef nel parent per utilizzare metodi esposti della Child"
      >
        <button className="bg-gray-200 border" onClick={openModal}>
          Btn defined in parent, Open MODAL
        </button>
        <Modal title="titolo" ref={modalRef}>
          ciao
          <button
            className="bg-gray-200 border"
            onClick={() => modalRef.current?.close()}
          >
            Btn from parent, close MODAL
          </button>
        </Modal>
      </Section>
    </Hooks1StateContext.Provider>
  );
}
