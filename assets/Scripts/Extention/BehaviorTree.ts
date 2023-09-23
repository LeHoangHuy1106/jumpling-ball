import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BehaviorTree')
export class BehaviorTree  {
    private rootNode: INode;
    private isActive = false;
    public SetRoot(nodeState: INode) {
        this.rootNode = nodeState;
    }
    public Action() {
        if (this.isActive)
        if(this.rootNode!= null)
            this.rootNode.Execute();
    }
    public Stop() {
        this.isActive = false;
    }
    public Continue() {
        this.isActive = false;
    }
    public Destroy(){
        this.rootNode = null;
    }

}


export enum NodeState {
    Success,
    Failure,
    Running
}


export interface INode {
    Execute(): NodeState;
}

export class SelectorNode implements INode {
    private childNodes: INode[];

    constructor(children: INode[]) {
        this.childNodes = children;
    }

    Execute(): NodeState {
        for (const childNode of this.childNodes) {
            const result = childNode.Execute();
            if (result === NodeState.Success) {
                return NodeState.Success;
            } else if (result === NodeState.Running) {
                return NodeState.Running;
            }
        }

        return NodeState.Failure;
    }
}

export class SequenceNode implements INode {
    private childNodes: INode[];

    constructor(children: INode[]) {
        this.childNodes = children;
    }

    Execute(): NodeState {
        for (const childNode of this.childNodes) {
            const result = childNode.Execute();
            if (result === NodeState.Failure) {
                return NodeState.Failure;
            } else if (result === NodeState.Running) {
                return NodeState.Running;
            }
        }
        return NodeState.Success;
    }
}

export class ActionNode implements INode {
    private action: () => NodeState;

    constructor(action: () => NodeState) {
        this.action = action;
    }

    Execute(): NodeState {
        return this.action();
    }
}

export class ConditionNode implements INode {
    private condition: () => boolean;

    constructor(condition: () => boolean) {
        this.condition = condition;
    }

    Execute(): NodeState {
        if (this.condition()) {
            return NodeState.Success;
        }
        return NodeState.Failure;
    }
}
