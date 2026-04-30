resource "aws_msk_cluster" "pipeline_bus" {
  cluster_name           = "pipeline-event-bus"
  kafka_version          = "3.2.0"
  number_of_broker_nodes = 3

  broker_node_group_info {
    instance_type = "kafka.m5.large"
    client_subnets = var.private_subnets
    security_groups = [aws_security_group.kafka_sg.id]
  }

  encryption_info {
    encryption_in_transit {
      client_broker = "TLS"
      in_cluster    = true
    }
  }
}

resource "aws_security_group" "kafka_sg" {
  name   = "pipeline-kafka-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port = 9092
    to_port   = 9092
    protocol  = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }
}
