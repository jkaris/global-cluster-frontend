// src/components/ui/GenealogyTree.js

import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import { useMembersMutation } from "../../features/user/userApiSlice";

// Initial Tree Data
const initialTree = {
  id: "root",
  name: "INF20953045",
  children: [
    {
      id: "child1",
      name: "INF20953045",
      children: [
        {
          id: "child1.1",
          name: "INF26837536",
          children: [],
        },
        {
          id: "child1.2",
          name: "kingetiawan1",
          children: [],
        },
      ],
    },
    {
      id: "child2",
      name: "INF20953045",
      children: [
        {
          id: "child2.1",
          name: "INF53002917",
          children: [],
        },
        {
          id: "child2.2",
          name: "+",
          children: [],
        },
      ],
    },
    {
      id: "child3",
      name: "INF20953045",
      children: [
        {
          id: "child3.1",
          name: "INF46709435",
          children: [],
        },
        {
          id: "child3.2",
          name: "qicicysap",
          children: [],
        },
      ],
    },
  ],
};

function GenealogyTree() {
  const [treeData, setTreeData] = useState(initialTree);
  const [members] = useMembersMutation();
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await members().unwrap();
        setTreeData(response);
      } catch (error) {
        if (error.response) {
          // Server errors (status code outside of 2xx range)
          console.error("Server Error:", JSON.stringify(error.response));
        } else if (error.request) {
          // Network errors or no response from server
          console.error("Network Error:", error.message);
        } else {
          // Other errors
          console.error("Error:", error.message);
        }
      }
    };
    fetchMembers();
  }, [members]);
  // Helper function to add a node
  const addNode = (id) => {
    const addNodeRecursive = (node) => {
      if (node.id === id) {
        const newNode = {
          id: `${id}-${node.children.length + 1}`,
          name: "New Node",
          children: [],
        };
        node.children.push(newNode);
      } else {
        node.children.forEach(addNodeRecursive);
      }
    };

    // Clone treeData to avoid direct state mutation
    const newTreeData = JSON.parse(JSON.stringify(treeData));
    addNodeRecursive(newTreeData);
    setTreeData(newTreeData);
  };

  return (
    <div className="p-10">
      <TreeNode node={treeData} addNode={addNode} />
    </div>
  );
}

export default GenealogyTree;
