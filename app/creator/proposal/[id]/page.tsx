"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ProtectedLayout from "@/components/ProtectedLayout";
import MovableSectionCard from "@/components/dnd/MovableSectionCard";
import { jsPDF } from "jspdf";
import { useParams } from "next/navigation";

interface Proposal {
  id: string;
  title: string;
  userContext: string;
  content: Content[];
  templateId: string;
  userId: string;
}
interface Content {
  id: string;
  title: string;
  content: string;
}

export default function ProposalEdit() {
  const params = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal>();
  const [loading, setLoading] = useState<boolean>(false);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/proposals/${params?.id}`);
        const data = await response.json();
        setProposal(data);
        const cnt = data?.content.map(
          (item: Partial<Content>, index: number) => ({
            id: (index++).toString(),
            ...item,
          })
        );
        setContents(cnt);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [params?.id]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      setContents((prevContents) => {
        const oldIndex = prevContents.findIndex(
          (content) => content.id === active.id
        );
        const newIndex = prevContents.findIndex(
          (content) => content.id === over?.id
        );
        return arrayMove(prevContents, oldIndex, newIndex);
      });
    }
  };

  const handleSave = (
    editedTitle: string | null,
    editedContent: string | null,
    index: number
  ) => {
    const updatedProposal = {
      ...proposal,
      content: proposal?.content?.map((section, idx) =>
        idx === index ? { title: editedTitle, content: editedContent } : section
      ),
    };
    console.log(updatedProposal);
    // setProposal(updatedProposal);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = proposal?.title || "Untitled Proposal";

    doc.setFontSize(14);
    doc.text(title, 10, 10);
    let yPosition = 20;

    proposal?.content?.forEach((section) => {
      doc.setFontSize(12);
      doc.text(section.title, 10, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      const pageWidth = doc.internal.pageSize.width - 20;
      const contentLines = doc.splitTextToSize(section.content, pageWidth);
      doc.text(contentLines, 10, yPosition);
      yPosition += contentLines.length * 5;
    });

    doc.save(`${title}.pdf`);
  };

  return (
    <ProtectedLayout>
      <Stack spacing={4}>
        <Box
          component="section"
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
            gutterBottom
          >
            {proposal?.title.toUpperCase()}
          </Typography>
          <Button variant="outlined" onClick={exportToPDF}>
            Export as PDF
          </Button>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ marginTop: 4 }}>
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext items={contents.map((content) => content.id)}>
                {contents?.map((section, index) => (
                  <MovableSectionCard
                    key={index}
                    id={section.id}
                    title={section.title}
                    content={section.content}
                    onSave={(editedTitle, editedContent) =>
                      handleSave(editedTitle, editedContent, index)
                    }
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Box>
        )}
      </Stack>
    </ProtectedLayout>
  );
}
