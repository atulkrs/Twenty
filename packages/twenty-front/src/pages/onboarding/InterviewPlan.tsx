import styled from "@emotion/styled";
import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// Styled Components
const Wrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #fff;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 1.125rem;
`;

const CardContent = styled.div`
  margin-top: 0.5rem;
  p {
    color: #555;
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button<{ variant?: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  border: ${({ variant }) => (variant === "destructive" ? "1px solid red" : "1px solid #ccc")};
  background-color: ${({ variant }) =>
    variant === "destructive" ? "#ffe5e5" : "#f0f0f0"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

// Badge
const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #eee;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #333;
`;

// Input & Textarea
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

// ================= Component =================
type Stage = { id: number; name: string; description: string; duration: string };

export default function InterviewPlan() {
  const [stages, setStages] = useState<Stage[]>([
    { id: 1, name: "Initial Call", description: "Intro call", duration: "10–15 mins" },
    { id: 2, name: "Assessment", description: "Technical test", duration: "30 mins" },
  ]);

  const [newStage, setNewStage] = useState<Stage>({
    id: 0,
    name: "",
    description: "",
    duration: "",
  });

  const handleAddStage = () => {
    if (!newStage.name) return;
    setStages((prev) => [...prev, { ...newStage, id: Date.now() }]);
    setNewStage({ id: 0, name: "", description: "", duration: "" });
  };

  const handleDeleteStage = (id: number) => setStages((prev) => prev.filter((s) => s.id !== id));

  return (
    <Wrapper>
      <Header>
        <h1>Interview Plan</h1>
        <Button onClick={handleAddStage}>
          <Plus size={16} /> Add Stage
        </Button>
      </Header>

      {stages.map((stage) => (
        <Card key={stage.id}>
          <CardHeader>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GripVertical />
              <CardTitle>{stage.name}</CardTitle>
            </div>
            <Badge>{stage.duration}</Badge>
          </CardHeader>
          <CardContent>
            <p>{stage.description}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button><Pencil size={14} /> Edit</Button>
              <Button variant="destructive" onClick={() => handleDeleteStage(stage.id)}>
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div>
        <h2>Add Stage</h2>
        <Input
          placeholder="Stage Name"
          value={newStage.name}
          onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={newStage.description}
          onChange={(e) => setNewStage({ ...newStage, description: e.target.value })}
        />
        <Input
          placeholder="Duration"
          value={newStage.duration}
          onChange={(e) => setNewStage({ ...newStage, duration: e.target.value })}
        />
        <Button onClick={handleAddStage}>Save</Button>
      </div>
    </Wrapper>
  );
}
