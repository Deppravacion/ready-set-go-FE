import { useAppProvider } from "../providers/AppContext";

type CardProps = {
  cardTitle: string;
  cardBody: string;
};

const Card: React.FC<CardProps> = ({ cardTitle, cardBody }) => {
  return (
    <div className='card shadow-sm bg-gray-200'>
      <div className='container mx-auto p-5 bg-cyan-600 rounded-md'>
        <h2 className='text-lg'>{cardTitle}</h2>
      </div>
      <div className='card-body'>{cardBody}</div>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  const { userTheme } = useAppProvider();
  const cardBodyData = [
    {
      cardTitle: "Step 1",
      cardBody: "Create and account or use the lite version as guest.",
    },
    {
      cardTitle: "Step 2",
      cardBody:
        "Select your storage tpye: Camper/Boat, Vehicle, or Storage Unit.",
    },
    {
      cardTitle: "Step 3",
      cardBody: "Add your items with photos and descriptions.",
    },
    {
      cardTitle: "Step 4",
      cardBody: "Check stores and locate items fast",
    },
  ];

  const title = "How It Works>!";

  return (
    <>
      <div data-theme={userTheme} className='card w-96 bg-base-100 shadow-xl'>
        <div className='container mx-auto p-10 bg-accent rounded-md'>
          <h2 className='text-lg'>{title}</h2>
        </div>
        <div className='card-body text-success-content'>
          {cardBodyData.map((card, index) => {
            return (
              <Card
                key={index}
                cardTitle={card.cardTitle}
                cardBody={card.cardBody}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
