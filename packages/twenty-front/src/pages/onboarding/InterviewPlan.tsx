import styled from "@emotion/styled";
import { Clock3, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #eee;
  font-family: system-ui, sans-serif;
  background-color: #000;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
`;

const SubHeader = styled.div`
  font-size: 0.85rem;
  color: #aaa;
`;

const Section = styled.div`
  border: 1px solid #333;
  border-radius: 0.5rem;
  background-color: #111;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  background-color: #130505ff;
  border: 1px solid #333;
  padding: 4px 14px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoundIconButton = styled.button`
  background-color: rgba(79, 189, 79, 1);
  border: 1px solid #222;
  color: #000;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButtonContainer = styled.button`
  background-color: #111;
  border: 1px solid #333;
  padding: 4px 8px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #222;
    border-color: #555;
  }

  svg {
    color: #aaa;
  }
`;

const SectionDescription = styled.div`
  font-size: 0.8rem;
  color: #999;
  padding: 0 1rem 1rem 1rem;
`;

const Divider = styled.div<{ color?: string; height?: string }>`
  height: ${(props) => props.height || "1px"};
  background-color: ${(props) => props.color || "#333"};
  width: 100%;
`;

const StageCard = styled.div`
  border: 1px solid #333;
  border-radius: 0.5rem;
  background-color: #1a1a1aff;
  margin: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
`;

const StageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
`;

const StageTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StageBadge = styled.span`
  font-size: 1rem;
  background-color: #070202ff;
  border-radius: 0.25rem;
  padding: 0.15rem 0.5rem;
  color: #ccc;
  font-weight: 600;
  user-select: none;
`;

const Duration = styled.span`
  font-size: 0.75rem;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #111;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  user-select: none;
`;

const StageBody = styled.div`
  padding: 0.75rem 1rem 1rem 1rem;
`;

const StageTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #eee;
`;

const StageDescription = styled.div`
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 0.25rem;
`;

type Stage = {
  id: number;
  name: string;
  description: string;
  duration: string;
};

export default function InterviewPlan() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: 1,
      name: "Initial Call",
      description: "First contact to introduce the role and assess interest.",
      duration: "10–15 mins",
    },
    {
      id: 2,
      name: "Assessment",
      description:
        "Evaluation of skills and qualifications through a AI Interview and Coding Assessment.",
      duration: "30 mins",
    },
  ]);

  const handleDeleteStage = (id: number) => {
    setStages((prev) => prev.filter((stage) => stage.id !== id));
  };

  return (
    <Wrapper>
      <Header>Interview Plan</Header>
      <SubHeader>
        Manages interview stages with drag-and-drop, allowing seamless movement
        of candidates through the hiring process.
      </SubHeader>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <GripVertical size={16} color="#007bff" />
            Interview Stages
          </SectionTitle>
          <ButtonContainer>
            <RoundIconButton>
              <Plus size={16} />
            </RoundIconButton>
          </ButtonContainer>
        </SectionHeader>

        <SectionDescription>
          Completed and confirmed interview stages.
        </SectionDescription>
        <Divider />

        {stages.map((stage) => (
          <StageCard key={stage.id}>
            <StageHeader>
              <StageTopLeft>
                <GripVertical size={16} color="#666" />
                <StageBadge>Stage</StageBadge>
              </StageTopLeft>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Duration>
                  <Clock3 size={14} />
                  {stage.duration}
                </Duration>

                <IconButtonContainer>
                  <Pencil size={14} />
                </IconButtonContainer>

                <IconButtonContainer onClick={() => handleDeleteStage(stage.id)}>
                  <Trash2 size={14} />
                </IconButtonContainer>
              </div>
            </StageHeader>

            <Divider
              color={
                stage.name === "Initial Call"
                  ? "#b3cbddff"
                  : stage.name === "Assessment"
                  ? "#e8ebcaff"
                  : "#ccc"
              }
              height={
                stage.name === "Initial Call" || stage.name === "Assessment"
                  ? "2px"
                  : "1px"
              }
            />

            <StageBody>
              <StageTitle>{stage.name}</StageTitle>
              <StageDescription>{stage.description}</StageDescription>
            </StageBody>
          </StageCard>
        ))}
      </Section>
    </Wrapper>
  );
}
